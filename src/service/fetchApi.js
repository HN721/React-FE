import axios from "axios";
const AUTH_URL = "http://localhost:8000/api";

const API_URL = "http://localhost:8000/api/products";

// CREATE
export async function addProduct(name, description, price, qty) {
  const getToken = localStorage.getItem("access_token");
  function getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };
  }
  try {
    const res = await axios.post(
      API_URL,
      {
        name,
        description,
        price: Number(price.toString().replace(/,/g, "")),
        qty: Number(qty),
      },
      getAuthHeader()
    );
    return res.data.results;
  } catch (err) {
    console.error(
      "❌ Failed to add product:",
      err.response?.data || err.message
    );
    throw err;
  }
}

// READ ALL
export async function getProducts() {
  const getToken = localStorage.getItem("access_token");
  function getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };
  }
  try {
    const res = await axios.get(API_URL, getAuthHeader());
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(
      "❌ Failed to fetch products:",
      err.response?.data || err.message
    );
    throw err;
  }
}

// READ BY ID
export async function getProductById(id) {
  const getToken = localStorage.getItem("access_token");
  function getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };
  }
  try {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    return res.data.results;
  } catch (err) {
    console.error(
      `❌ Failed to fetch product ID ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
}

// UPDATE
export async function updateProduct(id, name, description, price, qty) {
  const getToken = localStorage.getItem("access_token");
  function getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };
  }
  try {
    const res = await axios.put(
      `${API_URL}/${id}`,
      {
        name,
        description,
        price: Number(price),
        qty: Number(qty),
      },
      getAuthHeader()
    );
    return res.data.results;
  } catch (err) {
    console.error(
      `❌ Failed to update product ID ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
}

// DELETE
export async function deleteProduct(id) {
  const getToken = localStorage.getItem("access_token");
  function getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };
  }
  try {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return res.data.results;
  } catch (err) {
    console.error(
      `❌ Failed to delete product ID ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
}
// REGISTER
export async function register(name, email, password) {
  try {
    const res = await axios.post(`${AUTH_URL}/register`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to register:", err.response?.data || err.message);
    throw err;
  }
}

// LOGIN
export async function handleLogin(email, password) {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to login:", err.response?.data || err.message);
    throw err;
  }
}
