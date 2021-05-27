import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): any {
    return `<style>
    *, 
    *:before, 
    *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
      adding: 0;
    }
    
    body {
    background: #435363;
    -webkit-animation: bg 5s infinite alternate;
    -moz-animation: bg 5s infinite alternate;
    -o-animation: bg 5s infinite alternate;
    animation: bg 5s infinite alternate;
    }
    
    @-webkit-keyframes bg {
    0%   { background: #984D6F; }
    100% { background: #435363; }
    }
    @-moz-keyframes bg {
    0%   { background: #984D6F; }
    100% { background: #435363; }
    }
    @-o-keyframes bg {
    0%   { background: #984D6F; }
    100% { background: #435363; }
    }
    @keyframes bg {
    0%   { background: #984D6F; }
    100% { background: #435363; }
    }
    
    h1 {
    padding-top:100px;
    font-family: 'Joti One', cursive;
    font-size: 3.5em;
    text-align: center;
    color: #FFF;
    text-shadow: rgba(0,0,0,0.6) 1px 0, rgba(0,0,0,0.6) 1px 0, rgba(0,0,0,0.6) 0 1px, rgba(0,0,0,0.6) 0 1px;
    }
</style>
  <h1 
    style="display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    overflow-y: hidden;
    text-transform: uppercase;
    font-weight: 600;
    font-family: monospace;
    font-size: 30pt;">
    Welcome to QuykShop API
  </h1>`;
  }
}
