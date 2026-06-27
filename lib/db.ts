import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isUrlValid = supabaseUrl.startsWith("http://") || supabaseUrl.startsWith("https://");

// Gracefully initialize Supabase client
export const supabase = supabaseUrl && supabaseAnonKey && isUrlValid
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface RecruiterSubmission {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  linkedinUrl?: string;
  country: string;
  budget?: string;
  hiringTimeline?: string;
  recruitmentType: "Internship" | "Full Time" | "Contract" | "Freelance";
  referrer?: string;
  resumeViewed?: boolean;
  resumeDownloaded?: boolean;
  ip?: string;
  browser?: string;
  os?: string;
  device?: string;
  createdAt?: string;
  status?: "pending" | "contacted" | "scheduled";
  notes?: string;
}

export interface VisitorLog {
  id?: string;
  ip: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  os: string;
  resolution: string;
  referrer: string;
  sessionTime?: number;
  bounceRate?: number;
  createdAt?: string;
}

export interface EventLog {
  id?: string;
  type: string;
  metadata?: any;
  ip?: string;
  createdAt?: string;
}

// Check database connection and tables
export async function getRecruiters(): Promise<RecruiterSubmission[]> {
  if (!supabase) return getMockRecruiters();
  try {
    const { data, error } = await supabase
      .from("recruiters")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(mapDbRecruiter);
  } catch (err) {
    console.warn("[DB FALLBACK] Failed to fetch recruiters from Supabase:", err);
    return getMockRecruiters();
  }
}

export async function insertRecruiter(payload: RecruiterSubmission): Promise<RecruiterSubmission> {
  if (!supabase) return payload;
  try {
    const dbPayload = {
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message,
      linkedin_url: payload.linkedinUrl,
      country: payload.country,
      budget: payload.budget,
      hiring_timeline: payload.hiringTimeline,
      recruitment_type: payload.recruitmentType,
      referrer: payload.referrer,
      resume_viewed: payload.resumeViewed || false,
      resume_downloaded: payload.resumeDownloaded || false,
      ip: payload.ip,
      browser: payload.browser,
      os: payload.os,
      device: payload.device,
      status: payload.status || "pending",
      notes: payload.notes || ""
    };
    const { data, error } = await supabase
      .from("recruiters")
      .insert([dbPayload])
      .select();
    if (error) throw error;
    return mapDbRecruiter(data[0]);
  } catch (err) {
    console.error("[DB ERROR] Failed to insert recruiter to Supabase:", err);
    return payload;
  }
}

export async function updateRecruiterStatus(id: string, status: "pending" | "contacted" | "scheduled", notes?: string): Promise<boolean> {
  if (!supabase) return true;
  try {
    const { error } = await supabase
      .from("recruiters")
      .update({ status, notes })
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("[DB ERROR] Failed to update recruiter status:", err);
    return false;
  }
}

export async function deleteRecruiter(id: string): Promise<boolean> {
  if (!supabase) return true;
  try {
    const { error } = await supabase
      .from("recruiters")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("[DB ERROR] Failed to delete recruiter:", err);
    return false;
  }
}

export async function insertVisitor(payload: VisitorLog): Promise<boolean> {
  if (!supabase) return true;
  try {
    const { error } = await supabase
      .from("visitors")
      .insert([{
        ip: payload.ip,
        country: payload.country,
        city: payload.city,
        device: payload.device,
        browser: payload.browser,
        os: payload.os,
        resolution: payload.resolution,
        referrer: payload.referrer,
        session_time: payload.sessionTime || 0,
        bounce_rate: payload.bounceRate || 0
      }]);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("[DB ERROR] Failed to insert visitor log:", err);
    return false;
  }
}

export async function getVisitors(): Promise<VisitorLog[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(v => ({
      id: v.id,
      ip: v.ip,
      country: v.country,
      city: v.city,
      device: v.device,
      browser: v.browser,
      os: v.os,
      resolution: v.resolution,
      referrer: v.referrer,
      sessionTime: v.session_time,
      bounceRate: v.bounce_rate,
      createdAt: v.created_at
    }));
  } catch (err) {
    console.error("[DB ERROR] Failed to fetch visitors:", err);
    return [];
  }
}

export async function insertEvent(payload: EventLog): Promise<boolean> {
  if (!supabase) return true;
  try {
    const { error } = await supabase
      .from("events")
      .insert([{
        type: payload.type,
        metadata: payload.metadata || {},
        ip: payload.ip || "127.0.0.1"
      }]);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("[DB ERROR] Failed to insert event log:", err);
    return false;
  }
}

export async function getEvents(): Promise<EventLog[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return (data || []).map(e => ({
      id: e.id,
      type: e.type,
      metadata: e.metadata,
      ip: e.ip,
      createdAt: e.created_at
    }));
  } catch (err) {
    console.error("[DB ERROR] Failed to fetch events:", err);
    return [];
  }
}

// Helpers
function mapDbRecruiter(row: any): RecruiterSubmission {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    linkedinUrl: row.linkedin_url,
    country: row.country,
    budget: row.budget,
    hiringTimeline: row.hiring_timeline,
    recruitmentType: row.recruitment_type,
    referrer: row.referrer,
    resumeViewed: row.resume_viewed,
    resumeDownloaded: row.resume_downloaded,
    ip: row.ip,
    browser: row.browser,
    os: row.os,
    device: row.device,
    createdAt: row.created_at,
    status: row.status,
    notes: row.notes
  };
}

function getMockRecruiters(): RecruiterSubmission[] {
  return [
    {
      id: "mock-1",
      name: "Jane Doe",
      company: "Google",
      email: "jane@google.com",
      phone: "+1 650 253 0000",
      subject: "AI Automation Dev Roles",
      message: "Hey Vivek, impressed by your JavaMind and rShield projects. Let's schedule a call.",
      linkedinUrl: "https://linkedin.com/in/mock-jane",
      country: "United States",
      budget: "$120k/yr",
      hiringTimeline: "Immediate",
      recruitmentType: "Full Time",
      referrer: "GitHub",
      resumeViewed: true,
      resumeDownloaded: true,
      createdAt: new Date().toISOString(),
      status: "scheduled",
      notes: "Technical interview on Tuesday 10 AM EST"
    }
  ];
}
