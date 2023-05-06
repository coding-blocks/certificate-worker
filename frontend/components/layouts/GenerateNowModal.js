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
    const layout = props.layout

    const [substitutions, setSubstitutions] = React.useState(layout.params.reduce((acc, curr) => {
        acc[curr] = ""
        return acc
    }, {}))
    const [loading, setLoading] = React.useState(false)
    const [certificateUrl, setCertificateUrl] = React.useState(null)

    const handleChange = (e) => {
        setSubstitutions({
            ...substitutions,
            [e.target.name]: e.target.value
        })
    }


    const submitDetails = async () => {
        setCertificateUrl(null)
        setLoading(true)
        try {
            const response = await Api.post('/certificates/generate', {
                layoutId: layout._id,
                substitutions
            })
            const url = response.data.url
            setCertificateUrl(url)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
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

                {layout.params.map((param, i) => {
                    return <div className="mt-3" key={i}>
                        <span>{param}</span>
                        <input className="input-text" type="text" name={param} onChange={handleChange} value={substitutions[param]} />
                    </div>
                })}

                {/* <div className="button-solid white mt-3">
                    <button 
                        type="submit" 
                        onClick={submitDetails}
                        disabled={loading}
                    >
                        {loading ? 'Generating' : 'Submit'}
                    </button>
                </div> */}
                {/* <a href={`/api/certificates/generate?layoutId=${layout._id}`}>Download</a> */}
                <form action={'https://certification.codingblocks.com/api/certificates-download'}  method="POST">
                    <input type="hidden" name="layoutId" value={layout._id}></input>
                    <button className="button-solid white mt-3" type="submit">Download</button>
                </form>

                <div>
                    {certificateUrl && <a className="red mt-3" href={certificateUrl}>{certificateUrl}</a>}
                </div>
            </div>
        </Modal>
    )
}

export default QueryModal;