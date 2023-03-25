import { useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import * as MyHeader from './HelperMethods.js'
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import GoogleMapReact from 'google-map-react';
import device from './imgs/download.png'
import './styles/Device.css'
import { useLocation } from "react-router-dom"; 
import { blue } from '@material-ui/core/colors';
const AnyReactComponent = ({ text }) => <div>{text} <img src={device} alt={"logo"} style={{width:"30px"}}/></div>;
function DeviceModal() {


const [Devicesdata, setDevicesdata] = useState([]);
const [Powerconsumptiondata, setPowerconsumptiodata] = useState([]);
const [namedata, setnamedata] = useState([]);
const [iddata, setiddata] = useState([]);
const [dataarray, setdataarray] = useState([]);
const role = useLocation();
const getApiData = async () => {
    let deviceData=[];
        let names=[]
        let Powerconsumption=[]
        let dataarr=[]
        let idarr=[]
        try {
          const response = await fetch('http://localhost:9000/devices')
          deviceData = await response.json();
          let deviceDataobj=deviceData.data
          for(let i=0;i<deviceDataobj.length;i++){
            let temparr=[]
            let obj=deviceDataobj[i]
            console.log(obj)
            names.push(obj.name)
            let consump=obj.totalPowerConsumption.split(" ")
            Powerconsumption.push(parseInt(consump[0]))
            temparr.push(obj.id)
            idarr.push(obj.id)
            temparr.push(obj.temperature)
            temparr.push(obj.humidity)
            temparr.push(obj.lat)
            temparr.push(obj.lng)
            temparr.push(obj.name)
            temparr.push(obj.status)
            temparr.push(obj.totalPowerConsumption)
            dataarr.push(temparr)
          }
          setnamedata(names)
          setPowerconsumptiodata(Powerconsumption)
          console.log(names)
          console.log(Powerconsumption)
          setDevicesdata(deviceData.data);
          setdataarray(dataarr)
          setiddata(idarr)
        
        } catch (error) {
          console.log(error);
          deviceData = [];
          setDevicesdata(deviceData);
        }
    
        
  };
  let navigate=useNavigate()
  const navigateToDevice = (row) => {
    // 👇️ navigate to /Device
    let rolee=role.state
    console.log(rolee)
    if(rolee.role=="admin"){
    navigate('/device',{state:{ id: row}});
    }
    else{
      navigate('/Home',{state:{rolee}});
    }
  };

  useEffect(() => {
    getApiData();
  }, []);
  let arraycontents=[]
let  pieChartData={}
  if(Devicesdata.length>0){
    console.log(dataarray)
      arraycontents=dataarray.map((rowdata)=>{
        return <tr>{rowdata.map(row=><td style={{"border":"1px solid"}} onClick={()=>navigateToDevice(row)}>{row}</td>)}</tr>
    })
    pieChartData = {
        labels: namedata,
        datasets: [{
            data: Powerconsumptiondata,
            label: "Device power consumption",
        }]
      };
    }
    console.log(pieChartData)

    const defaultProps = {
      center: {
        lat: 10.99835602,
        lng: 77.01502627
      },
      zoom: 0
    };
    return (
      <div>
        {Devicesdata.length>0?(
            <div className='container'>
              <h2 style={{"text-align":'center','color':'grey',"margin":"1%"}}>Devices Details</h2>
              <div className='cont'>
               <div className='container'>
              <h3 style={{"text-align":'left','color':'blue',"margin":"1%"}}>Table showing devices' details</h3>   
        <table id="table" style={{'height':'80%','width':'100%','display':'block'}}>
           <tbody>
            <tr>
             {MyHeader.Devicetableheaders.map(row=><th style={{'border':'1px solid','width':'200px'}}>{row}</th>)}   
            </tr>
            {arraycontents}
            </tbody> 
        </table>
        </div> 
        <div style={{ height: '50vh', width: '40%' }}>
        <h3 style={{"text-align":'center','color':'blue'}}>Chart showing Power consumption</h3>     
        <Pie
  type="pie"
  width={130}
  height={50}
  options={{
    title: {
      display: true,
      text: "Devices power consumption",
      fontSize: 30
    },
    legend: {
      display: true, //Is the legend shown?
      position: "right" //Position of the legend.
    }
  }}
  data={pieChartData}
/>
</div>
</div>
<div style={{ height: '80vh', width: '100%' }}>
<h3 style={{"text-align":'left','color':'blue',"margin":"1%"}}>Map showing Devices' Locations</h3>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDxjv9H8cB3lyEP4gzRbdzkcfczcMHRO6g" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {Devicesdata.map(device => (
        <AnyReactComponent
          lat={device.lat}
          lng={device.lng}
          icon='./6119533.png'
          text={device.name}
        />
        ))}
      </GoogleMapReact>
      </div>
      

       </div>):<div></div>}
      </div>
    );
  }
  export default DeviceModal;