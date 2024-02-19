import React, { useReducer, useRef } from "react";
import styled from 'styled-components';
import { X } from 'react-feather';
import Link from '@mui/material/Link';

import { ThemedText } from '@theme/text';
import { Overlay } from '@components/modals/Overlay';
import { NetworkRow } from '@components/Send/NetworkRow';
import { networksInfo, SendNetworkType } from '@helpers/types';
import { ZKP2P_SURVEY_FORM_LINK } from "@helpers/docUrls";
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import useAccount from '@hooks/useAccount';
import useSendSettings from '@hooks/useSendSettings';

import baseSvg from '../../assets/images/base.svg';
import sepoliaSvg from '../../assets/images/sepolia.svg';


export const NetworkSelector: React.FC = () => {
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)

  /*
   * Contexts
   */

  const { network } = useAccount();
  const { sendNetwork, setSendNetwork, sendNetworks } = useSendSettings();

  /*
   * Handlers
   */

  const handleOverlayClick = () => {
    toggleOpen();
  };

  const handleSelectPlatform = (network: SendNetworkType) => {
    if (setSendNetwork) {
      setSendNetwork(network);

      toggleOpen();
    }
  };

  /*
   * Helpers
   */

  const networkSvg = (): string => {
    if (network === 'sepolia') {
      return sepoliaSvg;
    } else {
      if (sendNetwork) {
        return networksInfo[sendNetwork].networkSvg;
      } else {
        return baseSvg;
      }
    }
  };

  const networkName = (): string => {
    if (network === 'sepolia') {
      return 'Sepolia';
    } else {
      if (sendNetwork) {
        return networksInfo[sendNetwork].networkName;
      } else {
        return 'Loading';
      }
    }
  };

  /*
   * Component
   */

  return (
    <Wrapper ref={ref}>
      <NetworkContainer onClick={toggleOpen}>
        <NetworkLogoAndNameContainer>
          <NetworkSvg src={networkSvg()} />

          <NetworkNameContainer>
            <NetworkHeader>
              {'To'}
            </NetworkHeader>
            <NetworkNameLabel>
              {networkName()}
            </NetworkNameLabel>
          </NetworkNameContainer>
        </NetworkLogoAndNameContainer>
      </NetworkContainer>

      {isOpen && (
        <ModalAndOverlayContainer>
          <Overlay onClick={handleOverlayClick}/>

          <ModalContainer>
            <TableHeader>
              <ThemedText.SubHeader style={{ textAlign: 'left' }}>
                Select a network
              </ThemedText.SubHeader>

              <button
                onClick={handleOverlayClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <StyledX/>
              </button>
            </TableHeader>

            <HorizontalDivider/>

            <Table>
              {sendNetworks.map((network, index) => (
                <NetworkRow
                  key={index}
                  platformName={networksInfo[network].networkName}
                  flagSvg={networksInfo[network].networkSvg}
                  isSelected={sendNetwork === network}
                  onRowClick={() => handleSelectPlatform(network)}
                />
              ))}
            </Table>

            <TableFooter>
              Let us know which networks you are interested in seeing ZKP2P add support
              for. <Link href={ ZKP2P_SURVEY_FORM_LINK } target="_blank">
                Give feedback ↗
              </Link>
            </TableFooter>
          </ModalContainer>
        </ModalAndOverlayContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NetworkContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 188px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  align-items: center;
  background: #0E111C;
  padding: 1.05rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #141A2A;
  }
`;

const NetworkLogoAndNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: flex-start;
`;

const NetworkNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  justify-content: center;
  text-align: left;
`;

const NetworkHeader = styled.div`
  font-size: 14px;
  color: #CED4DA;
`;

const NetworkNameLabel = styled.div`
  font-size: 16px;
  color: #FFF;
`;

const NetworkSvg = styled.img`
  border-radius: 18px;
  width: 32px;
  height: 32px;
`;

const ModalAndOverlayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: flex-start;
  top: 0;
  left: 0;
  z-index: 10;
`;

const ModalContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #0D111C;
  color: #FFF;
  align-items: center;
  z-index: 20;
  
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TableHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 16px 20px;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  border-top: 1px solid #98a1c03d;
`;

const StyledX = styled(X)`
  color: #FFF;
`;

const Table = styled.div`
  width: 100%;
  color: #616161;
`;

const TableFooter = styled.div`
  padding: 20px;
  font-size: 14px;
  text-align: left;
  line-height: 1.5;
`;
