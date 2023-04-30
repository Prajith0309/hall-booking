const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()

app.use(express.json())


let rooms = [
    {id:"1", no_of_seats:50, amenities_in_room:["table","chairs","sofa","food","starionery"],price_1hr:`Rs3999/-`},
    {id:"2", no_of_seats:70, amenities_in_room:["table","chairs","sofa","food","starionery"],price_1hr:`Rs4999/-`},
    {id:"3", no_of_seats:80, amenities_in_room:["table","chairs","sofa","food","starionery"],price_1hr:`Rs5599/-`},
]

app.get('/hall-booking', (req,res)=>{
    res.send(rooms)
})

app.post('/hall-booking/addroom', (req,res)=>{
    const room = {
        id: (rooms.length+1).toString(),
        no_of_seats: req.body.no_of_seats,
        amenities_in_room:rooms[0].amenities_in_room,
        price_1hr:`Rs${req.body.price_1hr}/-`
    }
    rooms.push(room)
    res.send(rooms)
})

let bookedroom_data = [];

app.post('/hall-booking/bookroom', (req,res)=>{
    let roomAlreadyBooked = false;
 if(bookedroom_data.length>0){
    bookedroom_data.forEach((data)=>{
        if(parseInt(data.room_id) === req.body.room_id){
            roomAlreadyBooked = true;
            res.send('The room has been already booked! plz try another room.')
            return false;
        }
    })
        if(roomAlreadyBooked !== true){
            const bookedroom = {
                customer_name: req.body.customer_name,
                date:req.body.date,
                start_time:req.body.start_time,
                end_time:req.body.end_time,
                room_id: req.body.room_id.toString(),
                
            }
            bookedroom_data.push(bookedroom)
            res.send(bookedroom)
        }
    
 }else{
    const bookedroom = {
        customer_name: req.body.customer_name,
        date:req.body.date,
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        room_id: req.body.room_id.toString(),
        
    }
    bookedroom_data.push(bookedroom)
    res.send(bookedroom)
    }
    
})

app.get('/hall-booking/bookroom/bookroom-data', (req,res)=>{
    res.send(bookedroom_data)
})

let bookedroom_list = [];
app.post('/hall-booking/bookroom/bookroom-data/bookeddata',(req,res)=>{
    const value = bookedroom_data.find((data) =>{
       return parseInt(data.room_id) === req.body.room_id
    })
    if(!value){
        res.send(`The room with the id ${req.body.room_id} does not exists!`)
    }         
    else{
        let isBooked = false;
        if(bookedroom_list.length>0){
           
            bookedroom_list.forEach((data)=>{
                let name = data.room_name.split(' ')
                let id = parseInt(name[name.length - 1])
               if(id === req.body.room_id){
                    isBooked = true;
                    res.send(`The data of this particular room with id ${req.body.room_id} is already added.`)
                }
            })
        
         if(isBooked !== true){
            const  bookeddata =  {
                room_name:`This is room number ${parseInt(value.room_id)}`,
                booked_status: req.body.status,
                customer_name: value.customer_name,
                date:value.date,
                start_time:value.start_time,
                end_time:value.end_time
             }
             res.send(bookeddata)
             bookedroom_list.push(bookeddata)
         }
           
        }else{
            const  bookeddata =  {
                room_name:`This is room number ${parseInt(value.room_id)}`,
                booked_status: req.body.status,
                customer_name: value.customer_name,
                date:value.date,
                start_time:value.start_time,
                end_time:value.end_time
             }
             res.send(bookeddata)
             bookedroom_list.push(bookeddata)
        }
    }
    
})

app.get('/hall-booking/bookroom/bookroom-data/bookeddata/list', (req,res)=>{
    if(bookedroom_list.length>0){
       res.send(bookedroom_list)
       return false;
    }else{
      res.send('No rooms have been booked, So no data is present.')
      return false;
    }
})

let bookedcustomer_list = [];
app.post('/hall-booking/bookroom/bookroom-data/bookedcustomer',(req,res)=>{
    const value = bookedroom_data.find((data) =>{
       return parseInt(data.room_id) === req.body.room_id
    })
    if(!value){
        res.send(`The room with the id ${req.body.room_id} does not exists!`)
    }         
    else{
        let isBooked = false;
        if(bookedcustomer_list.length>0){
            
            bookedcustomer_list.forEach((data)=>{
                 let name = data.room_name.split(' ')
                let id = parseInt(name[name.length - 1])
                 if(id === req.body.room_id){
                     isBooked = true;
                     res.send(`The data of the  customer in this particular room is already added.`)
                     return false;
                 }
             })
         
          if(isBooked !== true){
             const  bookeddata =  {
                
                 customer_name: value.customer_name,
                 room_name:`This is room number ${parseInt(value.room_id)}`,
                 date:value.date,
                 start_time:value.start_time,
                 end_time:value.end_time,
              }
              res.send(bookeddata)
              bookedcustomer_list.push(bookeddata)
          }
            
         }else{
             const  bookeddata =  {
                 
                 customer_name: value.customer_name,
                 room_name:`This is room number ${parseInt(value.room_id)}`,
                 date:value.date,
                 start_time:value.start_time,
                 end_time:value.end_time,
              }
              res.send(bookeddata)
              bookedcustomer_list.push(bookeddata)
         }
    }
    
    
})

app.get('/hall-booking/bookroom/bookroom-data/bookedcustomer/list', (req,res)=>{
    if(bookedcustomer_list.length>0){
       res.send(bookedcustomer_list)
       return false;
    }else{
      res.send('No customers have booked a room still, So no data is present.')
      return false;
    }
})

let bookedtimes_list = [];
app.post('/hall-booking/bookroom/bookroom-data/bookeditems',(req,res)=>{
    const value = bookedroom_data.find((data) =>{
       return parseInt(data.room_id) === req.body.room_id
    })
    if(!value){
        res.send(`The room with the id ${req.body.room_id} does not exists!`)
    }         
    else{
        let isBooked = false;
        if(bookedtimes_list.length>0){
            
            bookedtimes_list.forEach((data)=>{
                 let name = data.room_name.split(' ')
                let id = parseInt(name[name.length - 1])
                 if(id === req.body.room_id){
                     isBooked = true;
                     res.send(`The data of the  customer in this particular room is already added.`)
                     return false;
                 }
             })
         
          if(isBooked !== true){
             const  bookeddata =  {
                
                 customer_name: value.customer_name,
                 room_name:`This is room number ${parseInt(value.room_id)}`,
                 date:value.date,
                 start_time:value.start_time,
                 end_time:value.end_time,
                 booking_id: uuidv4(),
                 booking_date: req.body.booking_date,
                 booking_status: req.body.booking_status
              }
              res.send(bookeddata)
              bookedtimes_list.push(bookeddata)
          }
            
         }else{
             const  bookeddata =  {
                 
                 customer_name: value.customer_name,
                 room_name:`This is room number ${parseInt(value.room_id)}`,
                 date:value.date,
                 start_time:value.start_time,
                 end_time:value.end_time,
                 booking_id: uuidv4(),
                 booking_date: req.body.booking_date,
                 booking_status: req.body.booking_status
              }
              res.send(bookeddata)
              bookedtimes_list.push(bookeddata)
         }
    }
    
    
})


app.get('/hall-booking/bookroom/bookroom-data/bookeditems/list', (req,res)=>{
    if(bookedtimes_list.length>0){
    const items = bookedtimes_list.map((item)=>{
       val =  item.customer_name
       return val
    })
    const countByName = items.reduce((acc, name) => {

        const lowerCaseName = name.toLowerCase(); 
        acc[lowerCaseName] = (acc[lowerCaseName]|| 0) + 1;
        return acc;
      }, {});
      
    res.send(countByName)
       return false;
    }else{
      res.send('No customers have booked a room still, So no data is present.')
      return false;
    }
})
const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`running in ${port}`)})