import React from 'react'

const Card = ({title, value, icon}) => {

    return (
        <div className="dashboard-card shadow rounded">
            <div className="dashboard-card-header">
                <div className="dashboard-card-title">
                    {title}
                </div>
            </div>
            <div className="dashboard-card-body">
                <i className="dashboard-card-icon material-icons">
                    {icon}
                </i>
                <p className="dashboard-card-value">
                    {value}
                </p>
            </div>
        </div>
    )

}

export default Card