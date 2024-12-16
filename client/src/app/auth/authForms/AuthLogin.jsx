import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { TextField, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import supabase from "@/utils/supabase"; // Adjust the path based on your file structure
import { useRouter } from 'next/navigation';

const AuthLogin = ({ title, subtitle, subtext }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Function to handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the email and password to the console for debugging
    console.log('Email:', email);
    console.log('Password:', password);

    // Use Supabase's signIn method to log in
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data)

    return

    if (loginError) {
      // If there was an error, set the error message
      setError('Sign-in error: ' + loginError.message);
    } else {
      // If login was successful, redirect the user
      console.log('Logged in successfully:', data);
      router.push('/'); // Redirect to the home page
    }
  };

  // if (session) {
  //   router.push('/'); // If the user is already logged in, redirect them to the home page
  // }

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <AuthSocialButtons title="Login with " />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>

      {error && (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <TextField
              id="email"
              variant="outlined"
              error={error !== ''}
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <TextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              error={error !== ''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
