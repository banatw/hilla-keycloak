import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { AutoGrid } from "@vaadin/hilla-react-crud";
import EmployeeModel from "Frontend/generated/com/example/application/data/EmployeeModel";
import { EmployeeService } from "Frontend/generated/endpoints";
export const config: ViewConfig = {
    rolesAllowed: ['ADMIN'],
    menu: {
        icon: 'line-awesome/svg/user.svg'
    }
}

export default function EmployeeView() {
    return(
        <>
            <AutoGrid service={EmployeeService} model={EmployeeModel}  />
        </>
    )
}