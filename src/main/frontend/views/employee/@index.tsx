import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { AutoGrid, AutoGridRef } from "@vaadin/hilla-react-crud";
import { Button, GridColumn, VerticalLayout } from "@vaadin/react-components";
import Employee from "Frontend/generated/com/example/application/data/Employee";
import EmployeeModel from "Frontend/generated/com/example/application/data/EmployeeModel";
import { EmployeeService } from "Frontend/generated/endpoints";
import React from "react";
import { NavLink } from "react-router";
export const config: ViewConfig = {
    rolesAllowed: ['ADMIN'],
    menu: {
        icon: 'line-awesome/svg/user.svg'
    }
}

function actionRenderer({item}: {item: Employee}) {
    return(
        <span>
            <NavLink to={`/employee/edit/${item.id}`}>Edit</NavLink>
        </span>
    )
}

export default function EmployeeView() {
    const autoGridReff = React.useRef<AutoGridRef>(null)

    return(
            <VerticalLayout>
            <AutoGrid  
                service={EmployeeService} 
                model={EmployeeModel}
                customColumns={[
                    <GridColumn renderer={actionRenderer} />,
                ]}
                hiddenColumns={['html']}
                columnOptions={{
                    name: {
                        renderer: ({item} : {item: Employee})=><NavLink to={`/employee/info/${item.id}`}>{item.name}</NavLink>
                    }
                }}

                
            />
            </VerticalLayout>
    )
}