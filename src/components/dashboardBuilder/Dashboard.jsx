import React from 'react'


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: "",
            initialDraggables: ['Advanced Chart', 'Financials', 'News'],
            items: [],
            DName: "",

        }
    }
    createDrags = () => {
        console.log("is this working?")
        console.log('here i am as well')
        FSBL.Clients.StorageClient.get({ key: "dashboardcreator-layout" }, (err, response) => {
            this.state.items.forEach((value, index) => {
                var newItemConfig = {
                    type: 'component',
                    componentName: 'example',
                    componentState: { text: "hello" }
                }
                console.log('myLayout:', response)
                response.createDragSource(document.getElementById(value), newItemConfig);
            })

        })
        return null;
    }
    getDraggables = () => {
        let drags = []
        this.state.items.forEach((value, index) => {
            drags.push(<div className="imageDivGroup" key={index}>
                <p draggable id={value} onDragStart={(e) => e.dataTransfer.setData('text/plain', `${value}`)} className="componentText"><i className="fas fa-chart-line" /> {value}</p>
            </div >)
        })
        return drags
    }
    handleChange = (event) => {
        if (event.target.id == 'filterText') {
            var updatedList = this.state.initialDraggables;
            updatedList = updatedList.filter(function (item) {
                return item.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            this.setState({ items: updatedList });
        }
        else {
            this.setState({ Dname: event.target.value })
        }
    }
    componentDidMount = () => {

        let myLayout = null;
        FSBL.Clients.StorageClient.save({
            key: "dashboardcreator-layout",
            value: myLayout
        }, (err, response) => {
            if (err)
                console.error(err)
            else {
                console.log('response:', response)
            }
        });


        this.setState({ items: this.state.initialDraggables })
    }
    handleClick = (event) => {

        if (event.target.id == "cancelButton") {
            //Need guidance on what to do here.
        }
        else {
            FSBL.Clients.RouterClient.transmit("Save", { "DName": this.state.Dname });
        }
    }
    render() {
        FSBL.Clients.RouterClient.addListener("Updated", (error, response) => {
            console.log('here i am updating')
            // if (error) {
            //     console.log("Save Error: " + (error));
            // } else {
            //     console.log(this)
            console.log('here')
            this.createDrags()
            console.log('here as well')
            // }
        });
        return (
            <div>
                <div className="container">
                    <div>
                        <div>
                            <img src="search-white.png" className="search_white" />
                            <input type="text" placeholder="filter" className="filterText" onChange={this.handleChange} id="filterText" />
                        </div>
                        <hr className="line" />
                        <div className="draggables-div" id="layoutContainer">
                            {this.getDraggables()}
                        </div>
                    </div>
                </div>
                <div className="saveAsBlock">
                    <div>
                        <label className="search_white" style={{ color: "white" }} >Save As:</label>
                        <input type="text" className="filterText" placeholder="File Name" id="DName" onChange={this.handleChange} />
                    </div>
                    <div>
                        <input type="button" value="Cancel" className="saveButtons" id="cancelButton" onClick={this.handleClick} />
                        <input type="button" value="Save" className="saveButtons" id="saveButton" onClick={this.handleClick} />
                    </div>
                </div>
            </div>
        )
    }
}