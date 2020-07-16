import * as React from 'react';
import { postData } from './timeTableApi';
import { today, getStartEndDateOfWeek, classes } from './timeTableHelper';
import { user } from './timeTableHelper';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './timeTable.css';
import 'font-awesome/css/font-awesome.min.css';

const localizer = momentLocalizer(moment);
export function Timetable() {
    const [timeTableItems, setTimetableItems] = React.useState([] as any);
    React.useEffect(() => {
        getCalendarDataApi().then((res: any) => {
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
    const newEvents = () => {
        const sTime = new Date('2020-07-16T06:27:09.607Z');
        const eTime = new Date('2020-07-16T09:27:09.607Z');
        console.log(sTime, "////", eTime)
        const ev = [{id:"1",title:"first",start:sTime,end:eTime},{id:"2",title:"second",start:sTime,end:eTime}];
        return ev;
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


    const isEvents = timeTableItems && timeTableItems.length > 0;
    return (<div>

        <div style={{ height: '500pt' }}>
            {isEvents && <Calendar className="bg-calendar"
                events={getEvents()}
                //events={newEvents()}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                defaultView={'week'}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={() => alert('I am an event')}
                toolbar={false}
                
            />
            }
        </div>
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