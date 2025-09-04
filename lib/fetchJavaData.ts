export default async function getData() {


    const java_response = await fetch("http://localhost:8080/category/name", {
		method: "GET",
		headers: {"Authorization": "Basic " + btoa('john:test123')}
	});
    const java_data = await java_response.json();

    return java_data;
}
