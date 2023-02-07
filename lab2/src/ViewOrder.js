function ViewOrder(props) {


    return (
        <div>
            {props.shoppingCart.map(salad => (
                <div key={salad.uuid}>{
                    Object.keys(salad.ingredients)
                        .join(', ')
                        .concat(', Pris: ' + salad.getPrice())
                }</div>
            ))}
        </div>
    );
}
export default ViewOrder;