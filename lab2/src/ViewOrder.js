function ViewOrder(props) {


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
            </div>
        </div>
    );
}
export default ViewOrder;