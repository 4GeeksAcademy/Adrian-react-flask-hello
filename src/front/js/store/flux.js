import { Private } from "../pages/Private";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null, 
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			signup: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email.toLowerCase(), 
							password: password
						})
					});
					const data = await response.json();
					if (!response.ok) {
						alert(data.msg)
					}
					console.log("response from signup", data);
					 return data;
					// return true
				} catch (error) {
					console.log("there was an error at signup", error);
					throw error;
				}
			},

			login: async (email, password)=> {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email.toLowerCase(), 
							password: password
						})
	
					})

					let data= await response.json()
					if (response.status===200) {
						sessionStorage.setItem("token", data.access_token)
						// console.log("response from login", data)
						return true
					}else if (response.status===401){
						alert(data.msg)
						return false 
					}else {
						console.log("unexpected error", response.status)
						return false
					}
				}catch (error) {
					console.log("there was an error during login", error)
					return false;
				}
				 
			},

			private: async () => {
				try {
					let response = await fetch (process.env.BACKEND_URL + "/api/protected", {
						headers: { Authorization: "Bearer " + getStore().token }
					})
					if (!response.ok) {
						return false
					} else {
						let data = await response.json();
						console.log("response in private route", data); 
						return true
				
					}
				} catch (error) {
					console.log("error occurred while going to the private page", error)
					return false
				}
			}
			
			
			// // // getMessage: async () => {
			// // 	try{
			// // 		// fetching data from the backend
			// // 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// // 		const data = await resp.json()
			// // 		setStore({ message: data.message })
			// // 		// don't forget to return something, that is how the async resolves
			// // 		return data;
			// // 	}catch(error){
			// // 		console.log("Error loading message from backend", error)
			// // 	}
			// // },
			// // changeColor: (index, color) => {
			// // 	//get the store
			// // 	const store = getStore();

			// // 	//we have to loop the entire demo array to look for the respective index
			// // 	//and change its color
			// // 	const demo = store.demo.map((elm, i) => {
			// // 		if (i === index) elm.background = color;
			// // 		return elm;
			// // 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;
