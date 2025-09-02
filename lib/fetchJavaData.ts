export default async function getData() {


    const java_response = await fetch("http://localhost:8080/category/name");
    const java_data = await java_response.json();

    return java_data;
}
