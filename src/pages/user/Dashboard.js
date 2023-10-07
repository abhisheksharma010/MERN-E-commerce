import React from 'react';
import Layout from '../../componenets/layout/Layout'
import UserMenu from '../../componenets/layout/UserMenu';

const Dashboard = () => {
  return (
    <Layout title={'DashBoard'}>
        <div className="container-flui p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <h1>DashBoard</h1>
                    </div>
                </div>

            </div>
        
    </Layout>
  )
}

export default Dashboard