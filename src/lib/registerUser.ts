
import { supabase } from "@/integrations/supabase/client";

/**
 * Registra un usuario en la tabla psychometric_registrations
 */
export async function registerUser({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("psychometric_registrations")
    .insert([{ full_name: fullName, email }]);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
