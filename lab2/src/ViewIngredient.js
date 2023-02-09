import { useParams } from "react-router-dom";
import { inventory } from "./inventory";

function ViewIngridient(props) {
    let { name } = useParams();
    
    return (
        <div className="container col-12">
            <div className="column h-200 p-5 bg-light border rounded-3">
                <h2>{name}</h2>
                {
                    Object.keys(inventory[name])
                        .map(key => key + ": " + inventory[name][key])
                        .join("\n")
                }
            </div>
        </div>
    );
}
export default ViewIngridient;