// InstallButton.js

import { Box, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";

const InstallButton = ({width}) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [openFlag, setOpenFlag] = useState(true);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setDeferredPrompt(event);

      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration()
        .then((registration) => {
          if (registration && registration.waiting) {
            setIsUpdateAvailable(true);
          }
        })
        .catch((error) => {
          console.error( error);
        });
    }
  };

  const handleUpdate = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  };


  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("installed successfully");
        } else {
          console.log("User declined installation");
        }

        setDeferredPrompt(null);
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: width - 75,
    },
    bgcolor: "background.paper",
    borderColor:"transperent",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    padding: 2,
  };

  return (
    <div>
      {(isInstallable || isUpdateAvailable) && (
        <Modal
          open={openFlag}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          //  style={{padding:0}}
        >
          <Box sx={style}>
            <p style={{ margin: 0 }}>
              Do you want to {isUpdateAvailable? "update":"install" } this Product app?
            </p>
            <br />
            <div>
              <button style={{marginRight:5}} onClick={ isUpdateAvailable? handleUpdate : handleInstall}>Yes</button>
              <button onClick={() => setOpenFlag(false)}>No</button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default InstallButton;
