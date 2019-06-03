import React, { Component } from 'react';

class Comments extends Component {

    render() {
        return(
            <div id="comments" className="comments">

                <div className="post-content shadow p-3 mb-5 rounded" >

                    <div className="comment-header">
                        <div className="profile-name"><p>Post title</p></div><br></br><br></br>
                    </div>

                    <div className="comment-content">Post content lorem ipsum bla bla bla</div>

                    <div className="comment shadow p-3 mb-5 bg-white rounded">

                        <div className="comment-header">
                            <div className="profile-pic"><img src="profile_pic.png" alt="profile_picture"/></div>
                            <div className="profile-name"><p>Rafael Augusto</p></div><br></br><br></br>
                        </div>
        
                        <div className="comment-content">Comment content lorem ipsum</div>

                    </div>


                    <div className="response shadow p-3 mb-5 bg-white rounded">

                        <div className="comment-header">
                            <div className="profile-pic"><img src="profile_pic.png" alt="profile_picture"/></div>
                            <div className="profile-name"><p>Rafael Augusto</p></div><br></br><br></br>
                        </div>
        
                        <div className="comment-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non pharetra quam, mollis pulvinar nunc. Etiam nunc libero, rhoncus vitae elit id, vulputate pulvinar mauris. Mauris ullamcorper tortor quis sagittis ultricies. Praesent aliquet condimentum vestibulum. Proin felis augue, luctus ac mattis aliquet, pellentesque non nunc. Sed commodo feugiat purus. Mauris enim dolor, tempor a dictum in, finibus quis urna. Donec condimentum rutrum metus, eu aliquet arcu aliquam sed. Ut tincidunt ac massa a sagittis. Nunc vel leo nulla. Pellentesque leo leo, vehicula dictum sem eu, sodales suscipit metus. Integer in ante ac orci dictum tincidunt vel id justo. Curabitur lacinia sit amet libero at egestas.</div>
        
                    </div>

                </div>
            </div>
        );
    }
}

export default Comments;