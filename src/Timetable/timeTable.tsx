import * as React from 'react';
import { postData } from './timeTableApi';
import { today, getStartEndDateOfWeek, classes } from './timeTableHelper';
import { user } from './timeTableHelper';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './timeTable.css';
import 'font-awesome/css/font-awesome.min.css';
import { Dialog } from '@fluentui/react-northstar';

const localizer = momentLocalizer(moment);
export function Timetable() {
    const [timeTableItems, setTimetableItems] = React.useState([] as any);
    const [loader, setLoader] = React.useState(true);
    const [popup, setPopup] = React.useState(false);
    React.useEffect(() => {
        getCalendarDataApi().then((res: any) => {
            setLoader(false);
            setTimetableItems(res);
        });
    }, []);
    const getEvents = () => {
        const events = timeTableItems.map((tti: any, i:number) => {
           // console.log(new Date(tti.start['dateTime']), "event number " + i + new Date(tti.end['dateTime']))
            return {
                id: tti.Id,
                title: tti.groupName,
                start: new Date(tti.start['dateTime']),
                end: new Date(tti.end['dateTime']),
                hexColor: tti.extensions[0].Type === "Lesson" ? "0082c54d" : (tti.extensions[0].Type.indexOf('Assignment') > -1) ? "b055be4d" : "0082c54d",                
            }
        });
        return events;
    }
    const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
        const backgroundColor = '#' + event.hexColor;
        const style = {
            backgroundColor: backgroundColor,
            border: "1px solid white"
        };
        return {
            style: style
        };
    }

    const handleSelect = (info:any) => {console.log(info) }
    const handleClick = () => {setPopup(true)}
    const isEvents = timeTableItems && timeTableItems.length > 0;
    return (<div>

        {!loader && !popup && <div style={{ height: '500pt' }}>
            {isEvents && <Calendar className="bg-calendar"
                events={getEvents()}
                //events={newEvents()}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                defaultView={'week'}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={() => handleClick()}
                toolbar={false}
                onSelectSlot={(info) => handleSelect(info)}
                selectable
            />
            }
        </div>
}
        {popup && <Dialog open={true} header={<h1>Events </h1>} cancelButton="Cancel" onCancel={() => setPopup(false)}/> }
    </div>)
}


export function getCalendarDataApi() {
    const ClassIds = classes;
    const { StartDateTime, EndDateTime } = getStartEndDateOfWeek(today);
    const url = '';
    const params = {
        StartDateTime: StartDateTime.toISOString(), EndDateTime: EndDateTime.toISOString(),
        RequestType: "Events", ClassIds, PrimaryRole: user.primaryRole,
        Memberinfo: { id: user.id, displayName: user.displayName }
    }
    return postData(url, params);
}