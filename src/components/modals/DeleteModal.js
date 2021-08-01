import Modal from 'react-modal'
import React, { useState,useContext } from 'react';
import Context from '../../context/create-context';

function DeletModal({ state,
    setOpenModal
}) {
     

    const fetchContext = useContext(Context);
    const [isOpen, setIsOpen] = useState(true);
    function openModal() {
      setIsOpen(true);
    }
  

    function closeModal() {
        setIsOpen(false);
        setOpenModal(false);
      }
    
    const deleteProduct = async () => {
        fetchContext.cache.clear();
        const responseBackend = await fetchContext.delete(`/delete/${state._id}`);
        if (fetchContext.response.ok) {
            //success 
            alert('Sccessfully deleted');
            setOpenModal(false);
        }
        else {
            alert('Deleteion failed');
        }
     }
    return (

       


            <Modal
                isOpen={isOpen}
              
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                    <p>Are you sure?</p>
            <div style={{display:'flex', justifyContent:'space-evenly' }}>
            <button style={{
                         backgroundColor: 'red',
                         color: '#fff',
                         padding: '10px',
                         marginTop:'5px',
                         borderRadius: '5px',
                         outline: 'none',
                         border: 'none',
                         cursor: 'pointer',
                      
                }}
                onClick ={deleteProduct}
                >YES</button>

            <button
                style={{
                            backgroundColor: 'red',
                            color: '#fff',
                            padding: '10px',
                            marginTop:'5px',
                            borderRadius: '5px',
                            outline: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            
                    }}
                 onClick = {e=>{ setOpenModal(false)}}    
                >NO</button>
                   </div>
                
            </Modal>
        
    )
}

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    content: {
        top: '30%',
        left: '50%',
        borderRadius: '10px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '10%',
        position: 'absolute'
    },
};

export default DeletModal
