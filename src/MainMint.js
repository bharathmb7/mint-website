import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import roboPunkNFT from "./RoboPunksNFT.json";

const roboPunksNFTAddress = "0x7a5ca50729aF6aB299fbFCBE684C7545D2266463";
const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunkNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" aligh="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            Hola, Mint Robopunks!!
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px "
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                fontFamily="inherit"
                padding="15px"
                cursor="pointer"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                type="number"
                value={mintAmount}
                readOnly
                fontFamily="inherit"
                width="100px"
                height="35px"
                textAlign="center"
                justifyContent="center"
                paddingLeft="19px"
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px "
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                fontFamily="inherit"
                padding="15px"
                cursor="pointer"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              onClick={handleMint}
              backgroundColor="#D6517D"
              borderRadius="5px "
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              fontFamily="inherit"
              padding="15px"
              margin="15px"
              cursor="pointer"
            >
              Mint now
            </Button>
          </div>
        ) : (
          <Text
            fontSize="30px"
            color="#D6517D"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            No account connected
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
