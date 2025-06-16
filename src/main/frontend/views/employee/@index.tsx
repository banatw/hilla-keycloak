import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { AutoGrid, AutoGridRef } from "@vaadin/hilla-react-crud";
import { Button, GridColumn, VerticalLayout,Notification } from "@vaadin/react-components";
import Employee from "Frontend/generated/com/example/application/data/Employee";
import EmployeeModel from "Frontend/generated/com/example/application/data/EmployeeModel";
import { EmployeeService } from "Frontend/generated/endpoints";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
export const config: ViewConfig = {
    rolesAllowed: ['ADMIN'],
    menu: {
        icon: 'line-awesome/svg/user.svg'
    }
}



export default function EmployeeView() {

    async function deleteHandler(id: number | undefined)  {
        if(id!==undefined) {
            var result = await EmployeeService.delete(id)
             Notification.show(result,  {
                        position: 'middle',
                        theme: 'success',
                        })
            autoGridReff.current?.refresh()
        }
    }

    function actionRenderer({item}: {item: Employee}) {
        return(
            <span>
                {/* <NavLink to={`/employee/edit/${item.id}`}>Edit</NavLink>&nbsp;&nbsp; */}
                <Button onClick={()=>navigate(`/employee/edit/${item.id}`)}>Edit</Button>&nbsp;&nbsp;
                <Button onClick={() => deleteHandler(item.id)}>Delete</Button>
            </span>
        )
    }
    const autoGridReff = React.useRef<AutoGridRef>(null)

    const navigate = useNavigate()

    return(
            <VerticalLayout className="h-full">
                <Button onClick={() => navigate(`/employee/add`)}>Add</Button>
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
                    ref={autoGridReff}
                    
                />
                <Button onClick={() => navigate(`/employee/add`)}>Add</Button>
            </VerticalLayout>
    )
}