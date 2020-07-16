export const today = new Date();
export function getStartEndDateOfWeek(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    let StartDateTime = new Date(d.setDate(diff));
    StartDateTime = new Date(StartDateTime.getFullYear(), StartDateTime.getMonth(), StartDateTime.getDate(), 0, 0, 0, 0);
    let EndDateTime: Date = new Date(StartDateTime);
    EndDateTime = new Date(EndDateTime.setDate(EndDateTime.getDate() + 7));
    EndDateTime = new Date(EndDateTime.setMinutes(EndDateTime.getMinutes() - 1));
    return { StartDateTime, EndDateTime };
}

export const user =  { displayName: "Mathilde Christiansen",
id: "c6372fd0-e097-433b-94bf-27ea9e899d28",
isTeacher: false,
locale: "en",
primaryRole: "student",
userPrincipalName: "81422@inlogicdev.onmicrosoft.com"
}

export const classes = [
    {id: "e3f20ac8-2b67-42c4-8f1e-8d085231dbb9", displayName: "Engelsk8a (en8a)"},
    {id: "cfc71efb-b670-4cc0-8b70-b4171e70ee5a", displayName: "Tysk8a (ty8a)"},
    {id: "db62994f-10ca-45d5-a322-ded688997229", displayName: "Matematik8a (mat8a)"},
    {id: "e25b5f31-1bad-46dc-a7a6-7bececed3ab2", displayName: "Idræt8a (id8a)"},
    {id: "a31cae6e-b7e6-43e4-aa7d-66fed9a16017", displayName: "Dansk8a (da8a)"}
]