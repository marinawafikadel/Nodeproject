import { useState, useEffect } from 'react';
import * as MyHeader from './HelperMethods.js'
import { Pie, Line,Bar } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Cards } from 'react-responsive-cards'
import CardMedia from '@material-ui/core/CardMedia';
import device from './imgs/devicesinfo.jpg'
import { useLocation } from "react-router-dom";
import './styles/Device.css'
function DeviceModal() {


const [Devicesdata, setDevicesdata] = useState([]);
const [Powerconsumptiondata, setPowerconsumptiodata] = useState([]);
const [namedata, setnamedata] = useState([]);
const [valuedata, setvaluedata] = useState([]);

const idstate = useLocation();
    useEffect(() => {
      (async () => {
        let deviceData=[];
        let Powerconsumption=[]
        let namedataarr=[]
        try {
          let idobj=idstate.state
          console.log(idobj)
          let id=idobj.id
          console.log(id)
          const response = await fetch("http://localhost:9000/devices/"+id)
          deviceData = await response.json();
          let data=deviceData.data
          let objpowerconsumption=data.totalPowerConsumptionpermonth
          let objpowerconsumptionvalues=Object.values(objpowerconsumption)
          for (let i=0;i<objpowerconsumptionvalues.length;i++){
            let arrsplit=objpowerconsumptionvalues[i]
            let arrsplitval=arrsplit.split(" ")
            Powerconsumption.push(parseInt(arrsplitval[0]))

          }
          console.log(Powerconsumption)
          //objpowerconsumption.map(item =>Powerconsumption.push(item))
          setPowerconsumptiodata(Powerconsumption)
          let keys=Object.keys(data)
          console.log(keys)
          let values=Object.values(data)
          console.log(values) 
          let str=""
          for(let i=3;i<keys.length-1;i++){
            str+=keys[i]+":"+""+values[i]+"\n"
          }
          console.log(str)
          setnamedata(str)
          
        
        } catch (error) {
          console.log(error);
          deviceData = [];
        }
    
        setDevicesdata(deviceData.data);
        console.log(Devicesdata)
    
        // Map
    
    
      })();
    }, []);

    const lineChartData = {
        labels: ["jan","feb","march","april","May","June","July","August","september","october","November","December"],
        datasets: [{
            data: Powerconsumptiondata,
            label: "Device power consumption",
            borderColor: "#3333ff",
            fill: true,
            lineTension: 0.5
        }]
      };
      const details = [
        {
          title: 'The Card Title',
          description: 'This is a short description',
          image: 'https://<image_here>.jpg',
        }
      ]
  
    return (
      <div className='container'>
      <h2 style={{"text-align":'center','color':'grey'}}> Detailed Information about the device</h2> 
      {Devicesdata!=undefined? 
      <div className='cont'>
      <div style={{width:'65%', height: '90vh',margin: '2%'}}>
      <h3 style={{"text-align":'left','color':'blue'}}> Detailed device power consumption</h3>  
    <Bar
      type="bar"
      width={160}
      height={60}
      options={{
        title: {
          display: true,
          text: "Power Consumption for this device",
          fontSize: 20
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      data={lineChartData}
    />
</div>

    <div style={{margin: '2%'}}>
     <Card
     bordered={true}
        style={{
          width: 400,
          backgroundColor: "light grey",
          border:"black",
          variant:'outlined'
        }}
      >
      <CardMedia
        component="img"
        height="300px"
        image={device}
        alt="Chevrolet"
      />
      
        <CardContent>
        <Typography variant="body1" color="text.secondary">
            Name:{Devicesdata.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Humidity:{Devicesdata.humidity}
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Temperature:{Devicesdata.temperature}
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Status:{Devicesdata.status}
            </Typography>
         
        </CardContent>
      </Card>
      </div>
      </div>:<div></div>}
      </div>
    );
  }
  export default DeviceModal;

  
