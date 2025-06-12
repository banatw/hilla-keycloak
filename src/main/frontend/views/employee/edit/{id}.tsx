import { useForm } from '@vaadin/hilla-react-form'
import { useSignal } from '@vaadin/hilla-react-signals'
import { Button, ConfirmDialog, EmailField, FormLayout, Notification, ShowOptions, TextField, VerticalLayout } from '@vaadin/react-components'
import Employee from 'Frontend/generated/com/example/application/data/Employee'
import EmployeeModel from 'Frontend/generated/com/example/application/data/EmployeeModel'
import { EmployeeService } from 'Frontend/generated/endpoints'
import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router'

export default function EmployeeEditView() {
    const {id} = useParams()

    const form = useForm(EmployeeModel,{
      onSubmit: async (employee)=>{
        var result = await EmployeeService.simpan(employee)
        Notification.show(result, { position : 'middle' })
      }
    })


    useEffect(() => {
        EmployeeService.get(Number(id)).then(form.read)
    },[])

  return (
    <FormLayout>
        <TextField label={'Name'} {...form.field(form.model.name)} autocomplete='off' />
        <EmailField label={'Email'} {...form.field(form.model.email)} autocomplete='off' />
        <Button onClick={form.submit}>Simpan</Button>
        <NavLink to={`/employee`}>Kembali</NavLink>
    </FormLayout>
  )
}
