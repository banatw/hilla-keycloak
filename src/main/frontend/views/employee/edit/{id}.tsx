import { useForm } from '@vaadin/hilla-react-form'
import { useSignal } from '@vaadin/hilla-react-signals'
import { Button, ConfirmDialog, EmailField, FormLayout, Notification, ShowOptions, TextField, VerticalLayout } from '@vaadin/react-components'
import Employee from 'Frontend/generated/com/example/application/data/Employee'
import EmployeeModel from 'Frontend/generated/com/example/application/data/EmployeeModel'
import { EmployeeService } from 'Frontend/generated/endpoints'
import React, { EventHandler, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';


export default function EmployeeEditView() {
    const {id} = useParams()

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

    useEffect(() => {
        EmployeeService.get(Number(id)).then((data)=>{
          form.read(data)
          setValue(data?.html)
        })
    },[])

  return (
    <FormLayout>
        <TextField label={'Name'} {...form.field(form.model.name)} autocomplete='off' />
        <EmailField label={'Email'} {...form.field(form.model.email)} autocomplete='off' />
        {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
        <Editor value={value} onChange={onChangeHandler} />
        <Button onClick={form.submit}>Simpan</Button>
        <NavLink to={`/employee`}>Kembali</NavLink>

    </FormLayout>
    
  )
}
