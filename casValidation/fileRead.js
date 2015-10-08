var fs = require('fs');
var readline = require('readline');
var http = require('http');
var stream = require('stream');

function onRequest(request, response){
	
	
	response.write('Hello .... your file is read successfully');
	response.end();	


// console.log(fs.readFileSync('new.txt').toString());

		// var rd = readline.createInterface({
	 //    input: fs.createReadStream('allcas.txt'),
	 //    output: process.stdout,
	 //    terminal: false
		// });

		// rd.on('line', function(line) {
		//     //console.log(line);

		//   //   if(line != '-' && line != '?')
		//   //   {
		// 		// console.log(line);		    	
		//   //   }

		// });

	
	// ******************* reading file line by line

		var instream = fs.createReadStream('allcas.txt');
		var outstream = new stream;
		var rl = readline.createInterface(instream, outstream);

		rl.on('line', function(line) {
		  // process line here

		 var data = [];
		 data.push(line);

		 // console.log('data : ' + data[0]);
		 for(var i=0; i < data.length ; i++)
		 {
		 	// if(data[i] != '-' && data[i] != '?')
		 	// {
		 	// 	console.log("***" + data[i]);
		 	// }

		 	 
		 	 // if(n == 0)
		 	 // {
		 	 // 	console.log('invalid')
		 	 // }

		 	// if(data[i].indexOf('-') > -1 && data[i].localeCompare('-') != 0 && data[i].localeCompare('[') != 0 && data[i].localeCompare(']') != 0 && data[i].localeCompare('{') != 0)
		 	if(data[i].indexOf('-') > -1 && data[i].localeCompare('-') != 0)
		 	{
		 		// console.log(data[i]);

		 		var val = data[i].replace('-', '');
		 		val = parseInt(val.replace('-', ''));

		 		var array = [];
		 		array = data[i].split('-');
		 		
		 		var last_dig = array[ array.length - 1 ]
		 		var add = 0;
 				var num = 1;
		 		
		 			while(val > 0)
		 			{
		 				var rem =	val % 10;
		 				// console.log(rem);
		 				add = add + (rem * num);
		 				val = parseInt(val / 10);
		 				
		 				// console.log(val)

		 				num += 1;
		 			}

		 			//console.log(add);
		 			var add_num = add % 10;
		 			if(add_num == last_dig)
			 		{
			 			fs.appendFile('valid.txt', data[i] + '\r\n', function (err) {
			 			//console.log('valid file is not appended');
						});
			 		}else{
			 			fs.appendFile('invalid.txt', data[i] + '\r\n', function (err) {
		 				//console.log('Invalid file is not appended');
						});
			 		}




		 		// var array = [];
		 		// array = data[i].split('-');
		 		// var num = 1;
		 		// var add = 0;
		 		// var last_dig;
		 		// var final_add = 0;
		 		// var temp = 0;
		 		// for(var a = (array.length - 1) ; a >= 0 ; a--)
		 		// {
		 		// 	// console.log(array[a]);
		 			
		 		// 	if(temp == 0)
		 		// 	{
		 		// 		last_dig = array[a];
		 		// 		temp += 1;
		 		// 	}
		 		// 	var dt = array[a];

		 		// 	while(dt >= 0)
		 		// 	{
		 		// 		var rem =	dt % 10;
		 		// 		// console.log(rem);
		 		// 		add = add + (rem * num);
		 		// 		dt = Math.round(dt / 10);

		 		// 		num += 1;
		 		// 	}
		 		// 	final_add =final_add + add;
		 		// 	// console.log(final_add);
		 		// }

		 			
		 		// 	console.log(final_add);
			 	// 	var add_num = final_add % 10;
			 	// 	if(add_num == last_dig)
			 	// 	{
			 	// 		fs.appendFile('valid.txt', data[i] + '\r\n', function (err) {
			 	// 		//console.log('valid file is not appended');
					// 	});
			 	// 	}else{
			 	// 		fs.appendFile('invalid.txt', data[i] + '\r\n', function (err) {
		 		// 		//console.log('Invalid file is not appended');
					// 	});
			 	// 	}
			}
		 	else{
		 		fs.appendFile('invalid.txt', data[i] + '\r\n', function (err) {
		 			//console.log('Invalid file is not appended');
				});
		 	}
		 	

		 }



		});

		rl.on('close', function() {
		  // do something on finish here
		});

}

http.createServer(onRequest).listen(3000);
console.log('server running.............. on port 3000');