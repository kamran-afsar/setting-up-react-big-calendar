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

export const user =  { 
// displayName: "Mathilde Christiansen",
displayName: "Rameez Majid",
// id: "c6372fd0-e097-433b-94bf-27ea9e899d28",
id: "e2209c84-7223-49d7-b7d2-84d1591463ad",
isTeacher: true,
locale: "en",
primaryRole: "Teacher",
// userPrincipalName: "81422@inlogicdev.onmicrosoft.com"
userPrincipalName: "rum@inlogicdev.onmicrosoft.com"
//rum@inlogicdev.onmicrosoft.com Rameez Majid
}

export const classes = [
    // {id: "e3f20ac8-2b67-42c4-8f1e-8d085231dbb9", displayName: "Engelsk8a (en8c)"},
    // {id: "cfc71efb-b670-4cc0-8b70-b4171e70ee5a", displayName: "Tysk8a (ty8c)"},
    // {id: "db62994f-10ca-45d5-a322-ded688997229", displayName: "Matematik8a (mat8c)"},
    // {id: "e25b5f31-1bad-46dc-a7a6-7bececed3ab2", displayName: "Idræt8a (id8c)"},
    // {id: "a31cae6e-b7e6-43e4-aa7d-66fed9a16017", displayName: "Dansk8a (da8c)"}

    {id: "0c71d601-5672-4943-9401-43a77964bed6", displayName: "Engelsk8a (en8c)"},
    {id: "4fa798b8-83ef-4b97-86e5-a9a4ff193a57", displayName: "Tysk8a (ty8c)"},
    {id: "fc5446f8-8a0d-44d5-a1b5-a041fec0fb0e", displayName: "Matematik8a (mat8c)"},
    {id: "a74fcb78-f2c5-42fd-b5bb-a274d94e69f1", displayName: "Idræt8a (id8c)"},
    {id: "906e5ced-3fcb-4c03-9d12-02c37b7928cb", displayName: "Dansk8a (da8c)"}
]
//0c71d601-5672-4943-9401-43a77964bed6
//4fa798b8-83ef-4b97-86e5-a9a4ff193a57
//fc5446f8-8a0d-44d5-a1b5-a041fec0fb0e
//a74fcb78-f2c5-42fd-b5bb-a274d94e69f1
//906e5ced-3fcb-4c03-9d12-02c37b7928cb