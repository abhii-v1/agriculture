import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./components/ForgotPassword";
import { GoogleIcon, FacebookIcon } from "./components/CustomIcons";
import RotateCard from "./components/RotateCard";

interface SignInProps {
  disableCustomTheme?: boolean;
  onSuccess: () => void; // ✅ added for callback
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "140%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  border: "none",
  boxShadow: "none",
  backdropFilter: "blur(3px)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "420px",
  },
  borderRadius: "20px",
  color: "#d40909ff",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#0000000a",
  color: "#ffffffdc",
  position: "relative",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function SignIn({ disableCustomTheme, onSuccess }: SignInProps) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://127.0.0.1:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      alert("User registered successfully!");

      // 🚀 Redirect to subscription page
      onSuccess();
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 1rem)",
              color: "#d9cccfff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Register Now !
            <RotateCard />
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            <FormControl>
              <FormLabel
                htmlFor="email"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Email
              </FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="password"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Password
              </FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ color: "#fff", fontWeight: "bold" }}
            />

            <ForgotPassword open={open} handleClose={handleClose} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(90deg, #4338ca, #6d28d9)",
                },
              }}
            >
              Sign In
            </Button>

            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "center", color: "#fff", fontWeight: "bold" }}
            >
              Forgot your password?
            </Link>
          </Box>

          <Divider
            sx={{ borderColor: "#555", color: "#fff", fontWeight: "bold" }}
          >
            or
          </Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                borderColor: "#888",
                "&:hover": { borderColor: "#aaa", backgroundColor: "#111" },
              }}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                borderColor: "#888",
                "&:hover": { borderColor: "#aaa", backgroundColor: "#111" },
              }}
              onClick={() => onSuccess()}
            >
              Sign in with Facebook
            </Button>

            <Typography
              sx={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                variant="body2"
                sx={{ color: "#7c3aed", fontWeight: "bold" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
