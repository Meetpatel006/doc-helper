import React, { useEffect, useState } from "react"

const NoPermissions: React.FC<{ permissionsEnabled: boolean }> = ({ permissionsEnabled }) => {
  const [checkingPermissions, setCheckingPermissions] = useState(true)
  const isFirefox = navigator.userAgent.includes("Firefox")

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        setCheckingPermissions(true)
        const permissions = await chrome.permissions.getAll()
      } catch (e) {
        console.error('Error checking permissions:', e)
      } finally {
        setCheckingPermissions(false)
      }
    }

    if (!permissionsEnabled) {
      checkPermissions()
    }
  }, [permissionsEnabled])

  return (
    <div className="popup">
      <div className="permissions-warning">
        {checkingPermissions && (
          <div className="checking-permissions">
            <p>Please wait while we check permissions</p>
            <span className="loader"></span>
          </div>
        )}
        {!checkingPermissions && (
          <>
            <p>Permissions are not enabled for this extension.</p>
            {isFirefox ? (
              <>
                <p>
                  To do this, right-click the extension and select manage
                  extension.
                </p>
                <p>
                  Then navigate to the permissions tab and enable the optional
                  permissions.
                </p>
                <p>
                  It will say "Access your data for all websites" but it is only
                  used for redirecting you to the problem page and getting the
                  LeetCode problem. I Promise.
                </p>
              </>
            ) : (
              <p>
                Please navigate to the extensions page of your browser, locate
                this extension, and enable the required permissions.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NoPermissions
