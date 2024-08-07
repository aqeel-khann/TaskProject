import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ProductForm from "./ProductForm";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/api/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("User Login Successfully", data.token);
                setIsAuthenticated(true);
         
            } else {
                setError(data.msg);
            }
        } catch (err) {
            setError("Internal server error");
        }
    };

    return (
        <Container maxWidth="sm">
            {isAuthenticated ? (<ProductForm />)
                : (
                    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                (document.getElementById("login-form").style.display = "block")
                            }
                            style={{ marginBottom: "20px" }}
                        >
                            Login
                        </Button>
                        <form
                            id="login-form"
                            onSubmit={handleSubmit}
                            style={{ display: "none", width: "100%" }}
                        >
                            <Typography variant="h5" gutterBottom>
                                Login
                            </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                )}
    </Container>
      
    )
}


export default Login;
