import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./Login.css";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAAD6+vr4+Pjo6Ojp6eny8vLx8fHb29vu7u719fV/f3+JiYn8/PwvLy/BwcF3d3eZmZnJycnPz8+5ubmsrKx0dHSRkZFPT09KSkojIyPOzs6Ojo7W1tZERERbW1s3Nzevr6+goKBra2tkZGQeHh5YWFg4ODgREREZGRkwMDAoKCgUFBRLybLXAAAKfUlEQVR4nO2daXuqOhSF6yyIE+JYJ9S2tvb//74L1mEFEtyBTWPPzfvpPD0YsxCSPSV5ebFYLBaLxWKxWCwWi8VisVgsFovFYvmf0+1WqzXXbV5xq6Z64vR3k02vcmUziRgMBp0YL2K5nE696N+DwWSyjzic2by/z+br9cf2q3dafH4fKxrMDp1dv/5L8vzOQqdvrGzGjbLltZbG1F2YB2Xqq3VM6zuzK01gYFralcVrOQIPpoUBXgn63K1pVQIzdoHVk2lNCdbcCuemFaVg/hWnpvVIYH0XG6bVSFkxKnymYfQO46tYTzX+4QWjdqP18tIOhjHT6XK59O4sz0yn0+j/drvdeByGQRD0+37M6+totFqt2hH1er3hOE6r6bq1WrUbf1n3bH9HBnhkgbda0X86bd/vj711WqLPpnAoNrwNmmxNa1DrDxIKD2xtfwrthmztauMmzEaXqV3xIeV8v/Xxhb6MmVoNsdHyzF4afewM15zoQZvfTG3mRxjXuzxtvkOTZZi8erRR4YinzR40yTdA5wbHPZ53pos3zWFpshA4ng5YWqyiQpYWi4GOOI9Z030yhSv2/jhPppC/P/UnUyg8Uywx49YzK2QZ+Z5tpBEUssTBn03hC7tC4Z7VOFosCPanzd7ib2VHsshU2Gr7q7quufrGfs+KoVbYHV76OhtruY4f0KJZ7/AHpUJhXtPxEWbwuT5zb/OgUuhWROh93cCnuLzqIqgUThIKK1Nqi/jJYQk91kQ1HyZ/wogJsUnMipJvS3moFK4qaZa0Jnc57kqJ6Cis0DKNY/jEpqRua6BS2KpIOJKaRJdzXlK3NVDapdLcA2ngwBgle9pOH6XCdPIhhtIkRrcWJXVbA7Vv0a9IoITohfgdU4SyABneU31TSUF56oTsIVeqID+Z/qHrON1EPpfgJFf/kMIfMEpfoZQYPW7yN6H4+HhJh9AmXs8URy9AlaAQM54fhDax0sS8c0FRqBtTnf85hcKT3Hrc5h4uN+8+URS+fME1hLgE5s/Nu08khei1E4YOHHx1ggNdhxiwdeoaMTxBoaqiFqd+wouFIxM9n+XGP/3RS8TdR8NhkPhTGBcFzsiDtKBQFdXHF4tgt4VwObnC42br4W1+PaYf9evtpjrXgkLVb49JRkIaFS1aqnNx99beJA2BI31/yYn1zSSF+GIRFKL7RHUuYHS6/WKQF7upQbOe1jJJIb5YhMExT04SPvF1/Zsn+RsGgWghB5JCjLwQFObIIDZk3cBlDNe3U3+uJSnEyAvhBXcpbYrU8CNXfwQXkVyHTs0h4SWHQkLATegucU0HlIXfnki0/q6GBgaBGJ/SEK4hTOGClUfMzcBNvM1H+HJI2iYOYiSFeOMo7hM6F9Ts060e9B6eg2fh/kDe+0Kc87UVUowUrF6lOhfdi2mIJsLo2giW3F1/bWq5FUkhTuGUKDa+QPR1R8F71LrY79XPcCq+GfXOZ6U3JPg4P5AU4hS+JzSKsdaCpWT+0AuLFVBoK6QYmgM+hcUhKRzBNZRMBIbnjNdfkion0Ayj1NmilUd5qktFai4lQYWUXMtTZZ/qFIVo0FPcIZxd+FeNaVKKQnxvKeHHUilFIV7/ydnbPGgrpPwmQqOms08kXw4VfqkuAlp/TiFedKK0io2SzauS0Fb4proIwUZNl7aRFOKkSapWwEZNZ59ICoVicMp79UyLSkgKm3gRpRgcFwaVum0DAZJC7dDSM2WfSAoF85ySmUf3yXRpGy22qaswb/apDMpRiO4TJXRVJvoKKcuWQ7jetPukr5ASNUH3acvV1ZzoK6RUyGBgh1bQWB60PBFeRLHCnml114jUF1xpSllgIDgXpe9GlY1PUohheoqdKUyghtdc4JjQU16F5SakjA/uMGTYqMH8jnpcx0QEyZJGs81wPBG7ok5JaNdxCZt/sHU2F9gTdQL7XVeh8HobfRGFyULd94OuQsHfMvqY4kOaMazjZTR/T9jMzGAgQ6hWz4gxTbQVCrXTW1O10A2hvjnLCUB/j7ajjlCwH73i3NXQP1uXuq7TqLdXo1ff7/eDIAjHu+HU8+J9QgfD5SS5I2jGVI4KidPbR6L102C8ehhYrDbjHrfbq9Xq1e8HYdTjXbyv1NLrTPaHzXlD0/W2d3rT2s30SlaYUL+KRbEv5HHbkY6swUx6OS9ZTx8+ztSa2E/VF6WH1uqvbNGXuRtQHoXSNTdnUgm339lFMtMYw5GRuApRNBNEEsNxarlqKWQXkaARRo4sSZahXhAzdGHZ2s48yJmhfU6PnbWVX4dXSVc6svP1IFSPCjViZ9KFqDE4bfzKKPP+qKtYeqATHWz05F8Itu1QfgUvj+dwVKi3m5RcwP0blT8zI1OC0RjmVhhpfEt/523GqaX/j5fTgJb7yvuU/jDykiJvuQzJHpw5+F70Ptbz2eawj7ez73jedNjZTzrT4JW862YxhRFNf4xiruPxPtnXiOPnorddz+ez2Xvc5ajD03hP03hT03hH09FlI9OG0+I8KSDXfPi4jcR2w7N4u1W2PuuBVlvebFl6xkka5yZX1KJvkTc4iE/62fh+TQg0mg5HyzHvmskQ2ojjlkmLx2yeESPCeW91opzPSQg0vL8EdiVvGkLcoTEp8Gh2WbvwQOXdoAz9xY+U32F4VTsOEpS6Nik4sLwlDxYwXXSDAeHcm2JnWaCmy91rLJ2Rb5Zyhmdr2ALgQ5o/fq0+TsB4obSwYCF/Ikmp0Pw+REKgKP8DlZwfrpjfhkgM/ecf9JpygcYr3V/FE7cK7Iokd3ZPhouk+8lge4GcfFcq0NhhcE2n3V9KcglF2vyWvIOGBNb3qtROobMq0vGahzE+Od2q23IaMfWIc6oqzq/5/Qu+H59qco4EyEvUxhJpl1teQJ9YlHPmwbjcdertke8Hl5zgZL+ZrbenhV5m7SR5rzKOSytW3fSVaE0RLFh5h/f5V64EoZR1cizLiO8VrNhOvNbyQavBE31DkiaT+jCqopvpiIe+yEtQMozX/CTmcEn89ofC9j+6T3OFl5l8knkQbGnprBXDsKXVPaGoisn4qm8vyOMNISszlg3prxKVd6u089oe7cw65zoEMojz2Qd1xKK8E+nu+TzJc3JgrUvLfBjKO9jz01V8x2If/mYQTOF/cHCzgDH2vvZ//SAcT9nDwmwvX4Fvgom1IDoT/vHzLWIRcYro3TgtFtHfU/U86/RNNLFfXlcsPTl+zQ+H/aTjTXfjMAj6/ipOrDUcp+lWH3mWbvIw6Z9wiflVZ06wC/uRa1AvfKagmzRuz2Xe+TZeeVJSoaE42PtMqz+Lk4rvTcR6O9NrlBlIFS11WLJMz0RKonB05xMcC1ecUVIiYiwOxkqGv2L+/Eke1IWupP0h/gKhSqH5hAIXqugh3wHBxtnJFZpehM2JvESSXND9F5C6ZaaT67x0JAr/vOEtIqmD/PuGt0j65BzTW+ewk1oA8g+4FgmSywLMH6DCTiIKZLo7ZSCsjvhXDG+BKqZpjZdilQIWRf57A82Z5m0poPnDRcriMvWb3qGrTNqdzUTv8FiLxWKxWCwWi8VisVgsFovFYrFYLBaLxULkP6SuikUTFhTrAAAAAElFTkSuQmCC"
          alt="logo"
        />
        <div className="login__text">
          <h1>Login</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
