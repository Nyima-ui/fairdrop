export interface AlertConfirmationEmailProps {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  maxPrice: number;
}

export function alertConfirmationEmail(
  emailData: AlertConfirmationEmailProps,
): string {
  const { origin, destination, startDate, endDate, maxPrice } = emailData;
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Your FairDrop Alert is Active</title>
       <style>
           *{
             margin: 0; 
             padding: 0; 
             box-sizing: border-box;
           }
       </style>
    </head>
    <body> 
  <div class="body" style="background-color: #DAE0E5; font-family: 'Helvetica', Arial, sans-serif; font-size: 16px; padding: 60px 0px" role="presentation">
  <div style="max-width: 528px; background-color: #FFFFFF; padding: 40px 28px; border-radius: 3px; margin: 0px auto" role="presentation">
    <a href="https://fairdrop-sage.vercel.app/" target="_blank">
      <img src="https://uhbyckpiasoinqkwftap.supabase.co/storage/v1/object/public/public-assets/email-fairdrop-logo.png" style="transform: translateX(-9px)" alt="FairDrop logo" /> </a>
    <p style="margin-top: 20px;">Hey!</p>
    <p style="margin-top: 20px;">Your price alert is live and working. Here's what we're tracking:</p>
    <p style="margin-top: 20px;"><strong>${origin}</strong> &rarr; <strong>${destination}</strong></p>
    <p style="margin-top: 20px;">
      <strong>${startDate}</strong>
      <span>to</span>
      <strong>${endDate}</strong>
      <span>Under</span>
      <span style="color: #1247B2; font-weight: 600;">₹${maxPrice.toLocaleString("en-IN")}</span>
    </p>

    <p style="max-width: 400px; margin-top: 20px;">We'll watch prices around the clock and ping you the moment we spot flights that match.</p>
    <p style="max-width: 400px; margin-top: 20px;">You'll get the top 3 cheapest options delivered straight to your inbox.</p>

    <p style="margin-top: 20px;">Sit back, relax, and let us do the hunting.</p>
    
    <a href="https://fairdrop-sage.vercel.app/alerts" style="text-decoration: none; background: #1247B2; color: white; padding: 10px 20px; border-radius: 3px; display: inline-block; margin: 25px 0px 0px;" aria-label="Manage alerts" target="_blank" rel="noopener noreferrer">Manage Alert</a>
    
    <p style="margin-top: 20px">Cheers,</p>
    <p style="">FairDrop</p>

    <p style="font-size: 14px; margin-top: 20px;">You're receiving this because you set a fare alert on FairDrop.</p>
  </div>
</div>
</body>
 </html>
`;
}
