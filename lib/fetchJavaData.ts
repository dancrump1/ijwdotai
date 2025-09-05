export default async function getData() {


    const java_response = await fetch("https://java.techdiff.io/category/name", {
        method: "GET",
        headers: { "Authorization": "Basic " + btoa('john:test123') }
    });
    const java_data = await java_response.json();

    return java_data;
}
