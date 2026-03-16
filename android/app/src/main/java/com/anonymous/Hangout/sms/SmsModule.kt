package com.anonymous.Hangout.sms

import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.util.Log
import android.provider.Telephony
import android.telephony.SmsManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class SmsModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val incomingSmsReceiver = IncomingSmsReceiver()

    override fun getName(): String = "SmsModule"

    init {
        registerIncomingSmsReceiver()
    }

    private fun registerIncomingSmsReceiver() {
        val filter = IntentFilter("android.provider.Telephony.SMS_RECEIVED")

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            reactContext.registerReceiver(
                incomingSmsReceiver,
                filter,
                Context.RECEIVER_EXPORTED
            )
        } else {
            reactContext.registerReceiver(incomingSmsReceiver, filter)
        }
    }

    override fun invalidate() {
        super.invalidate()
        try {
            reactContext.unregisterReceiver(incomingSmsReceiver)
        } catch (_: Exception) {
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Required by NativeEventEmitter
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Required by NativeEventEmitter
    }

    @ReactMethod
    fun callNumber(phoneNumber: String, promise: Promise) {
        try {
            val intent = Intent(Intent.ACTION_CALL).apply {
                data = Uri.parse("tel:$phoneNumber")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }

            reactApplicationContext.startActivity(intent)
            promise.resolve("CALL_STARTED")
        } catch (e: Exception) {
            promise.reject("CALL_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun sendSms(phoneNumber: String, message: String, promise: Promise) {
        try {
            val smsManager =
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    reactContext.getSystemService(SmsManager::class.java)
                } else {
                    SmsManager.getDefault()
                }

            val flags =
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    PendingIntent.FLAG_IMMUTABLE
                } else {
                    0
                }

            val sentIntent = PendingIntent.getBroadcast(
                reactContext,
                0,
                Intent("SMS_SENT"),
                flags
            )

            smsManager.sendTextMessage(phoneNumber, null, message, sentIntent, null)
            promise.resolve("SMS_SENT")
        } catch (e: Exception) {
            promise.reject("SMS_ERROR", e.message, e)
        }
    }

    private fun sendEvent(eventName: String, address: String, body: String, date: Double) {
        val params = Arguments.createMap().apply {
            putString("address", address)
            putString("body", body)
            putDouble("date", date)
        }

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

   inner class IncomingSmsReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != Telephony.Sms.Intents.SMS_RECEIVED_ACTION) return

        val messages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
        if (messages.isEmpty()) return

        val sender = messages.firstOrNull()?.displayOriginatingAddress ?: ""
        val body = messages.joinToString("") { it.messageBody ?: "" }
        val date = System.currentTimeMillis().toDouble()

        Log.d("IncomingSmsReceiver", "SMS from=$sender body=$body")

        sendEvent("IncomingSms", sender, body, date)
    }
}

}