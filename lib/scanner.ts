// KyDork Core Engine v1.0
// Developed by Fadhillah Dzaki Nasrullah

export const kyEngine = {
  // 1. Subdomain Finder (Basic Enumeration)
  subdomain: async (target: string) => {
    const commonPrefixes = ['www', 'api', 'dev', 'staging', 'admin', 'test', 'shop', 'blog'];
    const domain = target.replace(/^https?:\/\//, '').split('/')[0];
    const found = [];

    for (const prefix of commonPrefixes) {
      try {
        const sub = `${prefix}.${domain}`;
        const res = await fetch(`https://${sub}`, { method: 'HEAD', signal: AbortSignal.timeout(2000) });
        if (res.ok) found.push({ type: 'Subdomain Found', subdomain: sub, severity: 'Low', evidence: `Status: ${res.status} OK` });
      } catch (e) { /* skip if fail */ }
    }
    return found;
  },

  // 2. SQL Injection Scanner (Error-Based Basic)
  sql_injection: async (target: string) => {
    const payloads = ["'", "''", "admin'--", "' OR '1'='1"];
    const found = [];
    const url = target.startsWith('http') ? target : `https://${target}`;

    for (const payload of payloads) {
      try {
        const testUrl = `${url}?id=${encodeURIComponent(payload)}&search=${encodeURIComponent(payload)}`;
        const res = await fetch(testUrl);
        const text = await res.text();
        
        // Cek indikasi error database umum
        if (text.match(/sql|mysql|syntax|unexpected|oracle/gi)) {
          found.push({
            type: 'SQL Injection Potential',
            parameter: 'URL Query',
            severity: 'Critical',
            payload: payload,
            evidence: 'Database error pattern detected in response body.'
          });
          break; // Stop jika sudah ketemu satu yang vulnerable
        }
      } catch (e) { break; }
    }
    return found;
  },

  // 3. XSS Scanner (Reflected Basic)
  xss: async (target: string) => {
    const payload = "<script>alert('ky')</script>";
    const url = target.startsWith('http') ? target : `https://${target}`;
    try {
      const res = await fetch(`${url}?q=${encodeURIComponent(payload)}`);
      const text = await res.text();
      if (text.includes(payload)) {
        return [{
          type: 'Reflected XSS',
          parameter: 'q',
          severity: 'High',
          payload: payload,
          evidence: 'Payload reflected unsanitized in response body.'
        }];
      }
    } catch (e) { }
    return [];
  },

  // 4. Port Scanner (Common Ports via Fetch)
  port_scan: async (target: string) => {
    const ports = [21, 22, 80, 443, 3306, 8080];
    const results = [];
    const host = target.replace(/^https?:\/\//, '').split('/')[0];

    for (const port of ports) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1500);
        await fetch(`http://${host}:${port}`, { mode: 'no-cors', signal: controller.signal });
        clearTimeout(timeout);
        results.push({ type: 'Open Port', parameter: `Port ${port}`, severity: 'Medium', evidence: `Service potentially active on port ${port}` });
      } catch (e) { /* port closed or filtered */ }
    }
    return results;
  }
};
