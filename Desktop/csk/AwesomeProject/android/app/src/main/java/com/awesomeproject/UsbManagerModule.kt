package com.awesomeproject

import android.hardware.usb.UsbManager
import com.facebook.react.bridge.*
import java.util.*

class UsbManagerModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
 
  
    override fun getName(): String {
        return "UsbManagerModule"
    }

    @ReactMethod
fun getDeviceCount(promise: Promise) {
    try {
        val usbManager = reactContext.getSystemService(UsbManager::class.java)
        val deviceList = usbManager.deviceList

        promise.resolve(deviceList.size)
    } catch (e: Exception) {
        promise.reject("USB_DEVICE_COUNT_ERROR", e.message)
    }
}

    companion object {
        private val USB_PERMISSION = "com.awesomeproject.USB_PERMISSION"
    }
}
