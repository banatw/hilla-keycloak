import { ViewConfig } from '@vaadin/hilla-file-router/types.js'
import { useForm } from '@vaadin/hilla-react-form'
import { Button, EmailField, FormLayout,Notification, TextField } from '@vaadin/react-components'
import EmployeeModel from 'Frontend/generated/com/example/application/data/EmployeeModel'
import { EmployeeService } from 'Frontend/generated/endpoints'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';

export const config: ViewConfig = {
    rolesAllowed: ['ADMIN'],
    menu: {
        exclude: true
    }
}

export default function EmployeeAddView() {
  const form = useForm(EmployeeModel,{
      onSubmit: async (employee)=>{
        employee.html = value? value : ''
        var result = await EmployeeService.simpan(employee)
        Notification.show(result,  {
            position: 'middle',
            theme: 'success',
            })
           navigate(`/employee`)
      }
    })

    const [value, setValue] = useState<string>()
    const navigate = useNavigate()

    function onChangeHandler(e: ContentEditableEvent) {
      setValue(e.target.value)
    }

   
  return (
    <div>
        <FormLayout>
            <TextField label={'Name'}  {...form.field(form.model.name)} autocomplete='off' />
            <EmailField label={'Email'}  {...form.field(form.model.email)} autocomplete='off' />
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
            <Editor value={value} onChange={onChangeHandler} />
            <Button onClick={form.submit}>Simpan</Button>
            <NavLink to={`/employee`}>Kembali</NavLink>
        </FormLayout>
    </div>
  )
}
