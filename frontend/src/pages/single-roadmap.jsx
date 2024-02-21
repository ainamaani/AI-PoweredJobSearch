import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const SingleRoadMap = () => {
    const {id} = useParams();
    return ( 
        <div>
            <Typography variant="h4">
                Single road map for teaching for {id};
            </Typography>
        </div>
     );
}
 
export default SingleRoadMap;