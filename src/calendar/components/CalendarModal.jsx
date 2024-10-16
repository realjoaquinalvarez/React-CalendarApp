import { differenceInSeconds } from 'date-fns';
import { addHours } from 'date-fns';
import { useMemo, useState } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

// import { addHours } from "date-fns";
import Modal from "react-modal"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'

registerLocale('es', es )



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true)
    const [ formSubmitted, setFormSubmitted ] = useState(false)
    

    const [formValues, setFormValues] = useState({
        title: 'Fernando',
        notes: 'Herrera',
        start: new Date(),
        end: addHours( new Date(), 2 ),

    })

    const titleClass = useMemo(() => {
        if ( !formSubmitted ) return ''

        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid'

    }, [ formValues.title, formSubmitted ])

    const OnInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = ( event, changing = 'start' ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log('cerrando modal')
        setIsOpen( false )
    }

    const onSubmit = ( event ) => {
        event.preventDefault()
        setFormSubmitted(true)

        const difference = differenceInSeconds( formValues.end, formValues.start )

        if( isNaN( difference ) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return
        }
        
        if ( formValues.title.length <= 0 ) return 

        console.log( formValues )

        // TODO:
        // Remover errores en pantalla 
        // cerrar modal

    }
    
    
  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={ 200 }
    >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker 
                    selected={ formValues.start }
                    onChange={ (event) => onDateChanged(event, 'start')} 
                    className="form-control"
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption="hora"
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                    selected={ formValues.end }
                    onChange={ (event) => onDateChanged(event, 'end')} 
                    className="form-control"
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ `form-control ${ titleClass }` }
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ OnInputChanged }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ OnInputChanged } 
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

            </form>
    </Modal>
  )
}
