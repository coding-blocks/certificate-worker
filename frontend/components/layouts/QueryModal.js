import React from 'react';
import Modal from 'react-modal';
import Api from '../../services/api'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const QueryModal = (props) => {
    const params = props.layout.params
    const [substitution, setSubstitution] = React.useState(params.reduce((acc, curr) => {
        acc[curr] = ""
        return acc
    }, {}))
    const [certificateUrl, setCertificateUrl] = React.useState(null)

    const handleChange = (e) => {
        setSubstitution({
            ...substitution,
            [e.target.name]: e.target.value
        })
    }


    const submitDetails = async () => {
        const layoutId = props.layout._id

        const response = await Api.post('/certificates/generate', {
            layoutId,
            substitution
        })
        const data = await response.json()
        const url = data.url
        setCertificateUrl(url)

    }


    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className="container">
                <h3>Certificate Details</h3>

                {params.map((param) => {
                    return (<div>
                        {param} :{` `}
                        <input className="input-text col-lg-4" type="text" name={param} onChange={handleChange} value={substitution[param]} />
                    </div>)
                })}

                <div className="button-solid white">
                    <button type="submit" onClick={submitDetails}>Submit</button>
                </div>

                {certificateUrl && <a href={certificateUrl}>{certificateUrl}</a>}
            </div>
        </Modal>
    )
}

export default QueryModal;