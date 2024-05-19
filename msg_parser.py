import win32com.client
import pythoncom
import json
import os

def parse_message(file_path, attachments_destination):
    outlook = win32com.client.Dispatch("Outlook.Application", pythoncom.CoInitialize())
    msg = outlook.Session.OpenSharedItem(file_path)

    attachments = []
    for attachment in msg.Attachments:
        attachment_path = os.path.join(attachments_destination, attachment.FileName)
        attachment.SaveAsFile(attachment_path)
        attachments.append(attachment_path)

    recipients = []
    for recipient in msg.Recipients:
        recipients.append(recipient.Address)

    parsed_message = {
        'from': msg.Sender.Address,
        'to': recipients,
        'cc': [recipient.Address for recipient in msg.CC] if msg.CC else [],
        'bcc': [recipient.Address for recipient in msg.BCC] if msg.BCC else [],
        'subject': msg.Subject,
        'date': msg.SentOn.strftime('%Y-%m-%d %H:%M:%S'),
        'message_id': msg.EntryID,
        'references': msg.ConversationID,
        'attachments': attachments,
        'body': msg.Body
    }
    return parsed_message




