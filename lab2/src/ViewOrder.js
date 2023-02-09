import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

function ViewOrder(props) {
    const [showToast, setShowToast] = useState(false);
    const [confirmation, setConfirmation] = useState({});

    const handleSubmit = () => {
        let order = props.shoppingCart.map(salad => Object.keys(salad.ingredients));
        fetch("http://localhost:8080/orders/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success posting order: ', data);
            setConfirmation(data);
            setShowToast(true);
        })
        .catch((error) => {
            console.error('Error posting order: ', error);
            setConfirmation(error);
            setShowToast(true);
        });
    }

    return (
        <div className="container col-12">
            <div className="column h-200 p-5 bg-light border rounded-3">
                <h2>Dina sallader</h2>
                {props.shoppingCart.map(salad => (
                    <div key={salad.uuid}>{
                        Object.keys(salad.ingredients)
                            .join(', ')
                            .concat(', Pris: ' + salad.getPrice())
                    }</div>
                ))}
                <button 
                    onClick={() => handleSubmit()}
                    type="button"
                    className="btn btn-primary"
                >
                    Bekräfta
                </button>
            </div>
            <Toast
                onClose={() => setShowToast(false)}
                autohide
                show={showToast}
                delay={2200}
                >
                <Toast.Header>
                    <strong className="mr-auto">Order bekräftelse</strong>
                </Toast.Header>
                <Toast.Body>{JSON.stringify(confirmation)}</Toast.Body>
            </Toast>
        </div>
    );
}
export default ViewOrder;