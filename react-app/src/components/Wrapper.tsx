import React, {Component} from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";

class Wrapper extends Component<any, any> {
    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar/>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        );
    }
}

export default Wrapper;