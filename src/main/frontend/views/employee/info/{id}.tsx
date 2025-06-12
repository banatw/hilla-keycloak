import { useSignal } from '@vaadin/hilla-react-signals'
import { EmailField, TextField, VerticalLayout } from '@vaadin/react-components'
import Employee from 'Frontend/generated/com/example/application/data/Employee'
import { EmployeeService } from 'Frontend/generated/endpoints'
import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router'

export default function EmployeeInfoView() {
    const {id} = useParams()

    const employee = useSignal<Employee>()

    useEffect(() => {
        EmployeeService.get(Number(id)).then(emp => employee.value = emp)
    },[])

  return (
    <VerticalLayout>
        <TextField label={'Name'} value={employee.value?.name} readonly />
        <EmailField label={'Email'} value={employee.value?.email} readonly />
        <NavLink to={`/employee`}>Kembali</NavLink>
    </VerticalLayout>
  )
}
