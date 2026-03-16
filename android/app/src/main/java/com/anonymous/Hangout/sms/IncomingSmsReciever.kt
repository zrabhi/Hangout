package com.anonymous.Hangout.sms

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony
import android.util.Log

class IncomingSmsReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != Telephony.Sms.Intents.SMS_RECEIVED_ACTION) return

        val messages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
        if (messages.isEmpty()) return

        val sender = messages.firstOrNull()?.displayOriginatingAddress ?: ""
        val body = messages.joinToString(separator = "") { it.messageBody ?: "" }
        val date = System.currentTimeMillis()

        Log.d("IncomingSmsReceiver", "SMS from=$sender body=$body date=$date")

        val eventIntent = Intent("com.anonymous.Hangout.SMS_RECEIVED_EVENT").apply {
            putExtra("address", sender)
            putExtra("body", body)
            putExtra("date", date)
        }

        context.sendBroadcast(eventIntent)
    }
}