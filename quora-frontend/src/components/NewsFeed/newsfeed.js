import React, { Component } from 'react';
import Header from '../Header/Header'
import News from '../news/News'


class newsfeed extends Component {
    state = {  }
    render() { 
        return (
            <div>
           <Header/>
                <div class="row">
                    <div class="col-md-2">
                    1 of 3
                    </div>
                    <div class="col-md-7">
                        <News/>
                    </div>
                    <div class="col-md-3">
                    3 of 3
                    </div>
                </div>
            
             </div>
          );
    }
}
 
export default newsfeed;