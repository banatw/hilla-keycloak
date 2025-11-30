import { useForm } from '@vaadin/hilla-react-form'
import { useSignal } from '@vaadin/hilla-react-signals'
import { Button, ConfirmDialog, EmailField, FormLayout, Notification, ShowOptions, TextArea, TextField, VerticalLayout } from '@vaadin/react-components'
import Employee from 'Frontend/generated/com/example/application/data/Employee'
import EmployeeModel from 'Frontend/generated/com/example/application/data/EmployeeModel'
import { EmployeeService } from 'Frontend/generated/endpoints'
import React, { EventHandler, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
// import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import { EditControl } from "react-leaflet-draw"
import { LatLng, LatLngExpression, LatLngLiteral, LatLngTuple } from 'leaflet'
import { Editor } from '@hugerte/hugerte-react'


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
    const [lat,setLat] = useState<number>(0)
    const [lng,setLng] = useState<number>(0)
   

    // function onChangeHandler(e: ContentEditabanyleEvent) {
    //   setValue(e.target.value)
    // }

    useEffect(() => {
        EmployeeService.get(Number(id)).then((data)=>{
          // console.log(position)
          // console.log(pos)
          setValue(data?.html)
          form.read(data)
          setLat(data? data.latitude : 0)
          setLng(data? data.longitude : 0)
        })
    },[])

    
    const handleEditorChange = (newValue:any,editor:any)=>{
      setValue(newValue)
    }

    function MyComponent() {
      const map = useMap()
      console.log('map center:', map.getCenter())
      const latlng = new LatLng(lat,lng)
      // map.flyTo({lat: -6.714096405894872,lng: 106.73431945859822})   //-6.714096405894872, 106.73431945859822
      map.panTo({ lat: lat, lng: lng})
      return null
    }


  return (
    <FormLayout>
        <TextField label='tes' {...form.field(form.model.name)} />
        <EmailField label='Email' {...form.field(form.model.email)}  />
        {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
        <TextArea  label={'Address'} {...form.field(form.model.address)}  />
        <Editor value={value} onEditorChange={handleEditorChange} />
        <Button onClick={form.submit}>Simpan</Button>
        <NavLink to={`/employee`}>Kembali</NavLink>
        <MapContainer style={{ width: "100%", height: "100vh" }} center={{lat: lat,lng: lng}} zoom={13} scrollWheelZoom={false}>
                      {/* <MyComponent></MyComponent> */}
                        <FeatureGroup>
                            <EditControl
                                position='topleft'
                                draw={{
                                    rectangle: false,
                                    circle: true,
                                    polyline: false,
                                    polygon: true,
                                    marker: true,
                                    circlemarker: false,
                                }}
                                />
                        </FeatureGroup>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* <Marker position={position?position.value: 0}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker> */}
                    </MapContainer>
                   
    </FormLayout>
    
  )
}
