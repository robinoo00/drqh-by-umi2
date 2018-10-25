import React from 'react'

class Chart extends React.Component{
    componentDidMount(){
        const {data} = this.props;
        const canvas = document.getElementById("data-chart");
        const context = canvas.getContext("2d");
        canvas.width = window.screen.width;
        const x= canvas.width / 2;
        const y = 50;
        const r = 43;
        const width = 9;
        let start = 0,end = 0;
        for(let item of data){
            end += item.品种比列/50;
            context.beginPath();
            context.lineWidth = width;
            context.strokeStyle = item.color;
            context.arc(x,y,r,start*Math.PI,end*Math.PI);
            context.stroke();
            start += item.品种比列/50;
        }
    }
    render(){
        return(
            <canvas id="data-chart" height="100"></canvas>
        )
    }
}


export default Chart
